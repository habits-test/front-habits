type UserProps = {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

const User = ({ userData }: UserProps) => {
  return (
    <div>
      <div className="text-xl font-bold text-center">Dashboard</div>
      <div className="text-xl font-bold text-center">
        email : {userData.email}
      </div>
      <div className="text-xl font-bold text-center">
        firstName : {userData.firstName}
      </div>
      <div className="text-xl font-bold text-center">
        lastName : {userData.lastName}
      </div>
    </div>
  );
};

export default User;
