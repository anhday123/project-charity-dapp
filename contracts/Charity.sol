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
        bool ongoing;
        address projectAddress;
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
    }
    uint256 public nextId = 1;
    uint cooldownTime = 30 seconds;
    Donor[] public allDonors;   // mang donate
    Project[] public allProjects; //mang project
    Receiver[] public allReceviver; //mang nguoi nhan
    mapping (address => uint256) public ownerProjectAmount;
    mapping (uint256 => uint256) public IDDonateAmount;
    mapping (uint256 => uint256) public IDReceiverAmount;
    
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
        // require(
        //     allProjects[i].program_creator != msg.sender,
        //     'Please donate from another wallet'
        // );
        // require(isCharity() == false, 'cannot donate.');
        require(allProjects[i].ongoing != false,'The program is closed');
        // require(allProjects[i].amountDonated < allProjects[i].amountNeeded, 'the project already raised enough money');
        createDonationStruct(msg.value, id);
        // this.balance.transfer(msg.value);
        allProjects[i].amountDonated += msg.value;
        emit Funds_Donated(msg.sender, address(this), msg.value);
        // if (allProjects[i].amountDonated >= allProjects[i].amountNeeded) {
        //     //chạy chức năng để kết thúc dự án
        //     endProject(allProjects[i].id);
        //     // emit Goal_Reached(
        //     //     allProjects[i].program_creator,
        //     //     address(this),
        //     //     allProjects[i].amountDonated
        //     // );
        // }
        if(allProjects[i].readyTime <= block.timestamp){
            endProject(id);
        }
        
    }
    // tạo  project kêu gọi ủng hộ (tên, mô tả, số tiền cần, ảnh)
    function createProjectStruct(string memory name,string memory location,string memory description,uint256 amountNeeded,string memory imageUrl,address recipient) public {
        Project memory newProject = Project({
            id: nextId,
            program_creator: payable(msg.sender),
            projectName: name,
            location:location,
            description: description,
            amountNeeded: amountNeeded,
            amountDonated: 0,
            imageUrl: imageUrl,
            ongoing: true,
            projectAddress: address(this),
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


    function _isReady(Project storage _project) internal view returns (bool) {
        return (_project.readyTime <= block.timestamp);
    }

    function getAllProjectsLength() public view returns (uint256) {
        return allProjects.length;
    }
    
    // dừng chương trình 
    function endProject(uint256 id) public {
        uint256 i = find(id);
        // require(
        //     allProjects[i].amountDonated >= allProjects[i].amountNeeded,
        //     'project doesnt have enough money'
        // );
        Project storage myProject = allProjects[id];
        require(_isReady(myProject));
        require(msg.sender == allProjects[i].program_creator,'you have no right');
        emit Goal_Reached(
            allProjects[i].program_creator,
            address(this),
            allProjects[i].amountDonated
        );
        allProjects[i].ongoing = false;
        emit Project_Ended(
            allProjects[i].program_creator,
            address(this),
            allProjects[i].amountDonated
        );
      
        // //allProjects[i].program_creator.transfer(allProjects[i].amountDonated); // gửi số dư tài khoản đến program_creator
        
    }
    // chuyển tiền cho người thụ hưởng
    function pay(uint256 id)public payable returns(uint256 ethers){
        uint256 i = find(id);
        require(msg.sender == allProjects[i].program_creator,'you have no right');
        Receiver[] memory result = new Receiver[](IDReceiverAmount[id]);
        result = getIdReceiver(id);
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

    // function _isReady(Project storage _project) internal view returns (bool) {
    //     return (_project.readyTime <= block.timestamp);
    // }
    

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
            address,
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
            allProjects[i].projectAddress,
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
    // function () external fall {
    //     revert('not sure what you are doing');
    // }
    // tạo người nhận ủng hộ
    function createRegistered_recipientStruct(uint256 id) internal {Receiver memory newReceiver = Receiver(
        {receiverAddress: payable(msg.sender),
            projectID: id
        });
        allReceviver.push(newReceiver);
        IDReceiverAmount[newReceiver.projectID]++;
    }
    function Registered_recipient (uint256 id)public{
        uint256 i = find(id);
        require(allProjects[i].program_creator != msg.sender,'you cannot register');
        require(allProjects[i].recipient != msg.sender,'you cannot register');
        Receiver[] memory result = new Receiver[](IDReceiverAmount[id]);
        result = getIdReceiver(id);
        for(uint256 j=0;j<result.length;j++){
            require(msg.sender != result[j].receiverAddress,'you are already registered');
        }
        createRegistered_recipientStruct(id);
        
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