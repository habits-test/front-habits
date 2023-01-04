type UserProps = {
  test: string | null;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

const User = ({ test, userData }: UserProps) => {
  return (
    <div>
      <div className="text-xl font-bold text-center">Dashboard - {test}</div>
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
