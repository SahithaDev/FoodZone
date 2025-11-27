import React, { useEffect, useState } from "react";
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        avatar_url: "https://avatars.githubusercontent.com/u/191706916?v=4",
        name: "SAHITHA",
        location: "Default",
      },
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      try {
        const data = await fetch("https://api.github.com/users/Sahitha0203");
        const json = await data.json();
        console.log(json);
      } catch (error) {
        console.error(error);
      }
      fetchData(); // Remember to call the async function here
      this.setState({
        userInfo: json,
      });
    };
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;

    return (
      <div>
        <img src={avatar_url} />
        <h2>Name : {name}</h2>
        <h3>Location: {location}</h3>
      </div>
    );
  }
}

export default UserClass;
