// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Charity {
    
    struct Project {
        uint256 id;
        address payable program_creator;
        string projectName;
        string location;
        string description;
        uint256 amountNeeded;
        uint256 amountDonated;
        string imageUrl;
        string imageUrl1;
        bool ongoing;
        address payable recipient;
        uint32 readyTime;
    }

    struct Donor {
        address donorAddress;
        uint256 amount;
        uint256 projectID;
    }
    
    struct Receiver {
        address payable receiverAddress;
        uint256 projectID;
        string nameR;
        string locationR;
        string descriptionR;
        string CMND;
        string imageUrlR;
        string imageUrl1R;
        bool take;
    }
    uint256 public nextId = 1;
    uint cooldownTime = 5 minutes;
    Donor[] public allDonors;   // mang donate
    Project[] public allProjects; //mang project
    Receiver[] public allReceviver; //mang nguoi nhan
    mapping (address => uint256) public ownerProjectAmount;
    mapping (uint256 => uint256) public IDDonateAmount;
    mapping (uint256 => uint256) public IDReceiverAmount;
    mapping (bool => uint256) public ReceiverAmountTake;
    mapping (uint256 => uint256) public IDReceiverAmountTake;
    
    function createDonationStruct(uint256 amount, uint256 id) internal {Donor memory newDonor = Donor(
        {donorAddress: msg.sender,
            amount: amount,
            projectID: id
        });
        allDonors.push(newDonor);
        IDDonateAmount[newDonor.projectID]++;
    }

    function donate(uint256 id) public payable {
        require(msg.value > 0, 'Please donote more then 0 amount');
        //tìm project

        uint256 i = find(id);

        require(allProjects[i].ongoing != false,'The program is closed');
        createDonationStruct(msg.value, id);
        allProjects[i].amountDonated += msg.value;

        if(allProjects[i].readyTime <= block.timestamp){
            endProject(id);
        }
        
    }
    // tạo  project kêu gọi ủng hộ (tên, mô tả, số tiền cần, ảnh)
    function createProjectStruct(string memory name,string memory location,string memory description,uint256 amountNeeded,string memory imageUrl,string memory imageUrl1,address recipient) public {
        Project memory newProject = Project({
            id: nextId,
            program_creator: payable(msg.sender),
            projectName: name,
            location:location,
            description: description,
            amountNeeded: amountNeeded,
            amountDonated: 0,
            imageUrl: imageUrl,
            imageUrl1: imageUrl1,
            ongoing: true,
            recipient: payable(recipient),
            readyTime: uint32(block.timestamp + cooldownTime)
        });
        require(msg.sender != recipient,'does not allow you to be the recipient');
        allProjects.push(newProject);
        nextId++;
        ownerProjectAmount[newProject.program_creator]++;
        
        emit Project_Created(msg.sender, address(this), description);
    }
    function getAllDonors()public view returns(Donor[] memory){
        return allDonors;
    }
    
    function getAllProjects() public view returns(Project[] memory){
        return allProjects;
    }
    
    function getAllidDonateLength(uint256 id) public view returns (uint256) {
        return IDDonateAmount[id];
    }
    
    //danh sách ủng hộ của một chương trình
    function getDonor(uint256 id)public view returns(Donor[] memory){
        Donor[] memory result = new Donor[](IDDonateAmount[id]);
        uint256 count;
        for(uint256 i=0;i<allDonors.length;i++){
            if(allDonors[i].projectID == id){
                result[count] = allDonors[i];
                count++;
            }
          }
      return result;
    }
    
    function getAllOwnerProjectsLength(address _owner) public view returns (uint256) {
        return ownerProjectAmount[_owner];
    }
    
    // danh sách chương trình của một tài khoản 
    function getOwnerProjects(address _owner) public view returns (Project[] memory ) {
        Project[] memory result = new Project[](ownerProjectAmount[_owner]);
        
        uint count=0;
        for(uint i=0;i<allProjects.length;i++){
            if(allProjects[i].program_creator == _owner){
                result[count]=allProjects[i];
                count++;
            }
        }
        return result;  
        }
    
    
    // tìm project theo id
    function find(uint256 id) internal view returns (uint256) {
        for (uint256 i = 0; i < allProjects.length; i++) {
            if (allProjects[i].id == id) {
                return i;
            }
        }
        revert('Project does not exist');
    }
    // tìm receiver theo address
    function findAdd(address a) internal view returns (uint256) {
        for (uint256 i = 0; i < allReceviver.length; i++) {
            if (allReceviver[i].receiverAddress == a) {
                return i;
            }
        }
        revert('Receiver does not exist');
    }


    function _isReady(Project storage _project) internal view returns (bool) {
        return (_project.readyTime <= block.timestamp);
    }

    function getAllProjectsLength() public view returns (uint256) {
        return allProjects.length;
    }
    
    // dừng chương trình 
    function endProject(uint256 id) public {
        uint256 i = find(id);

        require(msg.sender == allProjects[i].program_creator,'you have no right');
        emit Goal_Reached(
            allProjects[i].program_creator,
            address(this),
            allProjects[i].amountDonated
        );
        allProjects[i].ongoing = false;
        allProjects[i].readyTime = uint32(block.timestamp);
        emit Project_Ended(
            allProjects[i].program_creator,
            address(this),
            allProjects[i].amountDonated
        );

    }

    // chuyển tiền cho người thụ hưởng
    function pay(uint256 id)public payable returns(uint256 ethers){
        uint256 i = find(id);
        require(msg.sender == allProjects[i].program_creator,'you have no right');
        Receiver[] memory result = new Receiver[](IDReceiverAmountTake[id]);
        result = getIdRTake(id);
        uint256 a = result.length;
        if(a==0){
            allProjects[i].recipient.transfer(allProjects[i].amountDonated);
            return allProjects[i].amountDonated;
        }else{
            uint b = allProjects[i].amountDonated / (a+1);
            allProjects[i].recipient.transfer(b);
            for(uint256 p=0; p<a; p++){
            result[p].receiverAddress.transfer(b);
            }
            return b;
        } 
    }

    //xem một project
    function readSingleProject(uint256 id)
        public
        view
        returns (
            uint256,
            address,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            bool,
            string memory,
            address
        )
    {
        uint256 i = find(id);
        return (
            allProjects[i].id,
            allProjects[i].program_creator,
            allProjects[i].projectName,
            allProjects[i].location,
            allProjects[i].description,
            allProjects[i].amountNeeded,
            allProjects[i].amountDonated,
            allProjects[i].ongoing,
            allProjects[i].imageUrl,
    
            //allProjects[i].projectAddress,
            allProjects[i].recipient
        );
    }
    // kiểm tra project có phải của địa chỉ này hay không
    function isCharity() public view returns (bool) {
        for (uint256 i = 0; i < allProjects.length; i++) {
            if (allProjects[i].program_creator == msg.sender) {
                return true;
            }
        }
        return false;
    }
    
    function createRegistered_recipientStruct(uint256 id,string memory nameR,string memory locationR, string memory descriptionR,string memory CMND,string memory imageUrlR,string memory imageUrl1R) public {
        Receiver memory newReceiver = Receiver(
        {receiverAddress: payable(msg.sender),
            projectID: id,
            nameR: nameR,
            locationR: locationR,
            descriptionR: descriptionR,
            CMND: CMND,
            imageUrlR: imageUrlR,
            imageUrl1R: imageUrl1R,
            take: false
        });
        uint256 i = find(id);
        require(allProjects[i].program_creator != msg.sender,'you cannot register');
        require(allProjects[i].recipient != msg.sender,'you cannot register');
        require(allProjects[i].ongoing != false,'The program is closed');
        Receiver[] memory result = new Receiver[](allReceviver.length);
        result = getAllReceiver();
        for(uint256 j=0;j<result.length;j++){
            require(msg.sender != result[j].receiverAddress,'you are already registered');
        }
        allReceviver.push(newReceiver);
        IDReceiverAmount[newReceiver.projectID]++;
    }
 
    function getAllReceiver() public view returns(Receiver[] memory){
        return allReceviver;
    }
    // lấy người nhận theo 1 chương trình
    function getIdReceiver(uint256 id)public view returns(Receiver[] memory){
        Receiver[] memory result = new Receiver[](IDReceiverAmount[id]);
        uint256 count;  
        for(uint256 i=0;i<allReceviver.length;i++){
            if(allReceviver[i].projectID == id){
                result[count] = allReceviver[i];
                count++;
           }
          }
      return result;
    }
    // lấy mảng số người được duyệt
    function SetTake()public view returns (Receiver[] memory ){
        uint count=0;
        Receiver[] memory result = new Receiver[](ReceiverAmountTake[true]);
        for(uint256 i=0;i<allReceviver.length;i++){
            if(allReceviver[i].take == true){
                result[count] = allReceviver[i];
                count++;
           }
        }
        return result;
    }
    // tạo sô lượng người được duyệt theo từng chương trình
    function getIdReceiverTake(uint256 id) public{
        Receiver[] memory result = new Receiver[](ReceiverAmountTake[true]);
        result = SetTake();
        for(uint256 i; i<result.length;i++){
            if(result[i].projectID == id){
                IDReceiverAmountTake[result[i].projectID]++;
            }
        }
    }
    //lấy mảng người được duyệt theo chương trình
    function getIdRTake(uint256 id)public view returns (Receiver[] memory ){
        Receiver[] memory settake = new Receiver[](ReceiverAmountTake[true]);
        settake = SetTake();
        uint count=0;
        Receiver[] memory result = new Receiver[](IDReceiverAmountTake[id]);
        for(uint256 i=0;i<settake.length;i++){
            if(settake[i].projectID == id){
                result[count] = settake[i];
                count++;
           }
        }
        return result;
    }

    // phê duyệt người nhận theo từng chương trình
    function approveReceiver(uint256 id, address a)public returns(bool b){
        uint256 p = find(id);
        require(msg.sender == allProjects[p].program_creator,'you have no right');

        uint256 i = findAdd(a);
        require(allReceviver[i].take == false,'Address approved');
        allReceviver[i].take = true;
        ReceiverAmountTake[allReceviver[i].take]++;
        return allReceviver[i].take;
    }
    

    // xem thông tin người nhận
    function readSingleReceiver(address a)
        public
        view
        returns (
            address,
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            bool
        )
    {
        uint256 i = findAdd(a);
        return (
            allReceviver[i].receiverAddress,
            allReceviver[i].projectID,
            allReceviver[i].nameR,
            allReceviver[i].locationR,
            allReceviver[i].descriptionR,
            allReceviver[i].CMND,
            allReceviver[i].imageUrlR,
            allReceviver[i].imageUrl1R,
            allReceviver[i].take
        );
    }

   


    //     //EVENTS
    // sự kiện khi hợp đồng được tạo. Hiển thị địa chỉ chủ sở hữu, địa chỉ hợp đồng và mô tả về hoạt động gây quỹ
    event Project_Created(
        address indexed _from,
        address indexed _project,
        string _desription
    );
    // sự kiện khi tiền được tặng. Hiển thị địa chỉ của nhà tài trợ, hợp đồng gây quỹ được tặng và giá trị được tặng
    event Funds_Donated(
        address indexed _from,
        address indexed _contract,
        uint256 _value
    );
    // sự kiện khi đạt được mục tiêu gây quỹ. Hiển thị địa chỉ người nhận, địa chỉ hợp đồng và số tiền huy động được
    event Goal_Reached(
        address indexed _from,
        address indexed _contract,
        uint256 _value
    );
    // sự kiện khi người nhận / chủ sở hữu hợp đồng kết thúc đợt gây quỹ. Hiển thị địa chỉ chủ sở hữu, địa chỉ hợp đồng và số tiền bị kê khai
    event Project_Ended(
        address indexed _from,
        address indexed _contract,
        uint256 _value
    );
 
} 