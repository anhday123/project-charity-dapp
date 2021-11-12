// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Charity {
    
    struct Project {
        uint256 id;
        address payable recipient;
        string projectName;
        string location;
        string description;
        uint256 amountNeeded;
        uint256 amountDonated;
        string imageUrl;
        bool ongoing;
        address projectAddress;
    }

    struct Donor {
        address donorAddress;
        uint256 amount;
        uint256 projectID;
    }
    uint256 public nextId = 1;
    Donor[] public allDonors;
    Project[] public allProjects; //mang project.
    mapping (address => uint256) public ownerProjectAmount;
    mapping (uint256 => uint256) public ownerDonateAmount;
    
    function createDonationStruct(uint256 amount, uint256 id) internal {Donor memory newDonor = Donor(
        {donorAddress: msg.sender,
            amount: amount,
            projectID: id
        });
        allDonors.push(newDonor);
        ownerDonateAmount[newDonor.projectID]++;
    }

    function donate(uint256 id) public payable {
        require(msg.value > 0, 'Please donote more then 0 amount');
        //tìm project
        uint256 i = find(id);
        // require(
        //     allProjects[i].recipient != msg.sender,
        //     'Please donate from another wallet'
        // );
        require(isCharity() == false, 'cannot donate.');
        require(allProjects[i].amountDonated < allProjects[i].amountNeeded, 'the project already raised enough money');
        createDonationStruct(msg.value, id);
        // this.balance.transfer(msg.value);
        allProjects[i].amountDonated += msg.value;
        emit Funds_Donated(msg.sender, address(this), msg.value);
        if (allProjects[i].amountDonated >= allProjects[i].amountNeeded) {
            //chạy chức năng để kết thúc dự án
            endProject(allProjects[i].id);
            emit Goal_Reached(
                allProjects[i].recipient,
                address(this),
                allProjects[i].amountDonated
            );
        }
    }
    // tạo  project kêu gọi ủng hộ (tên, mô tả, số tiền cần, ảnh)
    function createProjectStruct(string memory name,string memory location,string memory description,uint256 amountNeeded,string memory imageUrl) public {
        Project memory newProject = Project({
            id: nextId,
            recipient: payable(msg.sender),
            projectName: name,
            location:location,
            description: description,
            amountNeeded: amountNeeded,
            amountDonated: 0,
            imageUrl: imageUrl,
            ongoing: true,
            projectAddress: address(this)
        });
        allProjects.push(newProject);
        nextId++;
        ownerProjectAmount[newProject.recipient]++;
        
        emit Project_Created(msg.sender, address(this), description);
    }
    
    function getAllProjects() public view returns(Project[] memory){
        return allProjects;
    }
    
    function getAllOwnerDonateLength(uint256 id) public view returns (uint256) {
        return ownerDonateAmount[id];
    }
    function getDonor(uint256 id)public view returns(Donor[] memory){
        Donor[] memory result = new Donor[](ownerDonateAmount[id]);
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
    
    
    function getOwnerProjects(address _owner) public view returns (Project[] memory ) {
        Project[] memory result = new Project[](ownerProjectAmount[_owner]);
        
      uint count=0;
      for(uint i=0;i<allProjects.length;i++){
          if(allProjects[i].recipient == _owner){
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

    function getAllProjectsLength() public view returns (uint256) {
        return allProjects.length;
    }
    
    
    function endProject(uint256 id) public payable {
        uint256 i = find(id);
        require(
            allProjects[i].amountDonated >= allProjects[i].amountNeeded,
            'project doesnt have enough money'
        );
        emit Goal_Reached(
            allProjects[i].recipient,
            address(this),
            allProjects[i].amountDonated
        );
        allProjects[i].ongoing = false;
        emit Project_Ended(
            allProjects[i].recipient,
            address(this),
            allProjects[i].amountDonated
        );
      
        allProjects[i].recipient.transfer(allProjects[i].amountDonated); // sends the account balance to recipient
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
            allProjects[i].recipient,
            allProjects[i].projectName,
            allProjects[i].location,
            allProjects[i].description,
            allProjects[i].amountNeeded,
            allProjects[i].amountDonated,
            allProjects[i].ongoing,
            allProjects[i].imageUrl,
            allProjects[i].projectAddress
        );
    }
    // kiểm tra có project của địa chỉ này hay không
    function isCharity() public view returns (bool) {
        for (uint256 i = 0; i < allProjects.length; i++) {
            if (allProjects[i].recipient == msg.sender) {
                return true;
            }
        }
        return false;
    }
    // function () external fall {
    //     revert('not sure what you are doing');
    // }



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