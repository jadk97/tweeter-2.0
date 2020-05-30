import React from "react";
import UserListItem from "./UserListItem";
const UserList = (props) => {


  return(
    <div>
        {props.notifUsers.map((user) => 
          <UserListItem 
          avatar={user.avatar}
          bio={user.bio} 
          creatorHandle={user.creatorHandle}
          creatorName={user.creatorName}
          />
          
          )}   
    </div>

  );

}

export default UserList;