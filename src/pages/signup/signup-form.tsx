import { useMemo, useState } from 'react';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import PasswordInput from '@/components/password-input/password-input';
import ErrorText from '@/components/error-text/error-text';
import Dropdown from '@/components/dropdown/dropdown';
import { GENDER } from '@/constant/constant';
import TextArea from '@/components/textArea/textArea';
import { validatePassword } from '@/utils/validate-password';
import Link from 'next/link';
import moment from 'moment';
import PasswordRequirements from './password-requirements';
import useUser from '@/store/useUser';
import { useRouter } from 'next/router';
import { ICreateUser, ICreateUserError } from '@/interface/IUser';
import { validateEmail } from '@/utils/validate-email';

const SignupForm = () => {
  const router = useRouter();
  const [data, setData] = useState<ICreateUser>({
    username: '',
    password: '',
    firstName: '',
    email: '',
    birthDate: '',
    description: '',
    gender: '',
  });
  const [error, setError] = useState<ICreateUserError>({
    username: false,
    password: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    },
    birthDate: false,
    email: false,
    gender: false,
    name: false,
  });
  const [createUser, loading] = useUser((state) => [
    state.createUser,
    state.loading,
  ]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setData((prevData) => ({ ...prevData, [name]: value }));

    const validation = (() => {
      switch (name) {
        case 'password':
          return validatePassword(value);
        case 'email':
          return !validateEmail(value);
        default:
          return !value;
      }
    })();

    setError((prevErrors) => ({
      ...prevErrors,
      [name]: validation,
    }));
  };

  const handleSignup = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const isPasswordInValid = Object.values(error.password).some((e) => !e);
    if (
      !data.username ||
      !data.password ||
      isPasswordInValid ||
      !data.birthDate ||
      !data.email ||
      !data.gender ||
      !data.firstName
    ) {
      setError({
        ...error,
        username: !data.username,
        birthDate: !data.birthDate,
        email: !data.email,
        gender: !data.gender,
        name: !data.firstName,
      });
      return;
    }
    await createUser(data, router);
  };

  // Get today's date using moment
  const today = useMemo(() => moment(), []);
  // Disable future dates
  const maxDate = useMemo(
    () => today.subtract(1, 'year').format('YYYY-MM-DD'),
    []
  );
  // Set minimum date to a reasonable past date,=> 120 years ago
  const minDate = useMemo(
    () => today.subtract(120, 'years').format('YYYY-MM-DD'),
    []
  );

  return (
    <div className="w-9/12">
      <div className="w-[100%]">
        <div className="my-8">
          <h2 className="text-2xl font-normal mb-4">Signup</h2>
          <p>Signup to access your vault account</p>
        </div>
        <form>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 flex-col md:flex-row ">
              <div className="flex flex-1  flex-col  gap-1">
                <Input
                  id="signup__username"
                  placeholder="Enter username"
                  key="signup_username"
                  onChange={handleChange}
                  type="text"
                  value={data.username}
                  name="username"
                  className="w-[100%]"
                  isRequired={true}
                  label="Username"
                />
                {error.username && (
                  <ErrorText error="please enter the username" />
                )}
              </div>

              <div className="flex flex-1  flex-col gap-1">
                <Input
                  id="signup__first_name"
                  placeholder="Enter First Name"
                  onChange={handleChange}
                  type="text"
                  value={data.firstName}
                  name="firstName"
                  className="w-[100%]"
                  isRequired={true}
                  label="First Name"
                />
                {error.name && (
                  <ErrorText error="please enter the  first name" />
                )}
              </div>
            </div>

            <div className="flex gap-2 flex-col md:flex-row">
              <div className="flex flex-1 flex-col gap-1">
                <Input
                  id="signup__email"
                  placeholder="Enter email"
                  key="signup_email"
                  onChange={handleChange}
                  type="email"
                  value={data.email}
                  name="email"
                  className="w-[100%]"
                  isRequired={true}
                  label="Email"
                />
                {error.email && <ErrorText error="please enter the email" />}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <PasswordInput
                  id="signup__password"
                  placeholder="Enter password"
                  key="signup_password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  label="Password"
                />
                <div className="text-sm">
                  <PasswordRequirements passwordErrors={error.password} />
                </div>
              </div>
            </div>

            <div className="flex gap-2 flex-col md:flex-row">
              <div className="flex flex-1 flex-col gap-1">
                <Dropdown
                  name="gender"
                  options={GENDER}
                  placeholder="select gender"
                  value={data.gender}
                  label="Gender"
                  id="gender"
                  onChange={handleChange}
                  isRequired={true}
                ></Dropdown>
                {error.gender && <ErrorText error="please enter the email" />}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <Input
                  id="signup__birthdate"
                  placeholder="Select Birthdate"
                  onChange={handleChange}
                  type="date"
                  value={data.birthDate}
                  name="birthDate"
                  className="w-[100%]"
                  isRequired={true}
                  label="Birthdate"
                  otherProps={{ min: minDate, max: maxDate }}
                />
                {error.birthDate && (
                  <ErrorText error="please enter the email" />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <TextArea
                name="description"
                value={data.description}
                onChange={handleChange}
                placeholder="description"
                id="description"
                label="Description"
              />
            </div>
            <div>
              <Button
                onClick={handleSignup}
                id=""
                className="w-[100%]"
                size="medium"
                disabled={loading}
              >
                signup
              </Button>
            </div>
            <div className="flex text-center text-sm gap-1 justify-center">
              <p>Already have an account?</p>
              <Link href="/signin" className="text-blue-800">
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
