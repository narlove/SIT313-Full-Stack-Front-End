import { useUser } from "./UserContext";

function Homepage() {
  const { currentUser } = useUser();

  return (
    <>
      <h1>this is a homepage</h1>      

      {/* maybe ready for lifting state up thru props and using that to handle user login status
       was gonna do it for this project but it's not a requirement and i've already spent too much time here anyway */}
      <h3>{"current logged in user: " 
        + (currentUser ? currentUser.firstName + " " + currentUser.surname : "anonymous") }</h3>
    </>
  );
}

export default Homepage;
