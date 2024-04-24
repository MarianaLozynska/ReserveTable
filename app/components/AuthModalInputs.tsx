interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignin: boolean;
}

export default function AuthModalInputs({
  inputs,
  handleChangeInput,
  isSignin,
}: Props) {
  return (
    <div>
      {isSignin ? null : (
        <div className="my-3 flex justify-between text-sm">
          <input
            className="bg-white text-black border rounded p-2 py-3 w-[49%]"
            placeholder="First name"
            value={inputs.firstName}
            onChange={handleChangeInput}
            name="firstName"
          ></input>
          <input
            className="bg-white text-black border rounded p-2 py-3 w-[49%]"
            placeholder="Last name"
            value={inputs.lastName}
            onChange={handleChangeInput}
            name="lastName"
          ></input>
        </div>
      )}
      <div className="my-3 text-sm">
        <input
          className="bg-white text-black border rounded p-2 py-3 w-full"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChangeInput}
          name="email"
        ></input>
      </div>
      {isSignin ? null : (
        <div className="my-3 flex justify-between text-sm">
          <input
            className="bg-white text-black border rounded p-2 py-3 w-[49%]"
            placeholder="Phone"
            value={inputs.phone}
            onChange={handleChangeInput}
            name="phone"
          ></input>
          <input
            className="bg-white text-black border rounded p-2 py-3 w-[49%]"
            placeholder="City"
            value={inputs.city}
            onChange={handleChangeInput}
            name="city"
          ></input>
        </div>
      )}
      <div className="my-3 text-sm">
        <input
          type="password"
          className="bg-white text-black border rounded p-2 py-3 w-full"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChangeInput}
          name="password"
        ></input>
      </div>
    </div>
  );
}
