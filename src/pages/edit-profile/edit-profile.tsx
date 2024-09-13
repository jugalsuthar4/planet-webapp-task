import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import ErrorText from '@/components/error-text/error-text';
import Dropdown from '@/components/dropdown/dropdown';
import { GENDER } from '@/constant/constant';
import TextArea from '@/components/textArea/textArea';
import moment from 'moment';
import useUser from '@/store/useUser';
import { IUpdateUser, IUpdateUserError } from '@/interface/IUser';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { validateEmail } from '@/utils/validate-email';

const EditProfile = () => {
  const router = useRouter();
  const [user, updateUser, success, loading] = useUser((state) => [
    state.user,
    state.updateUser,
    state.success,
    state.loading,
  ]);

  const [data, setData] = useState<IUpdateUser>({
    username: '',
    firstName: '',
    email: '',
    birthDate: '',
    description: '',
    gender: '',
  });
  const [error, setError] = useState<IUpdateUserError>({
    username: false,
    birthDate: false,
    email: false,
    gender: false,
    name: false,
  });

  useEffect(() => {
    if (user) {
      setData({
        birthDate: moment(user.birthDate).format('YYYY-MM-DD'),
        description: user?.description ?? '',
        firstName: user?.firstName ?? '',
        email: user?.email ?? '',
        gender: user?.gender ?? '',
        username: user?.username ?? '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      toast.success(success, { toastId: 'edit_profile' });
    }
  }, [success]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setData((prevData) => ({ ...prevData, [name]: value }));
    const validation = (() => {
      switch (name) {
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

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      !data.username ||
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
    await updateUser(data, router);
  };

  // Get today's date using moment
  const today = useMemo(() => moment(), []);
  // Disable future dates
  const maxDate = useMemo(
    () => today.subtract(1, 'year').format('YYYY-MM-DD'),
    []
  );
  //  120 years ago
  const minDate = useMemo(
    () => today.subtract(120, 'years').format('YYYY-MM-DD'),
    []
  );

  return (
    <div className="w-9/12">
      <div className="w-[100%]">
        <div className="my-8">
          <h2 className="text-2xl font-normal mb-4">Edit Profile</h2>
          <p>Manage your account details.</p>
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
                  id="signup__firstname"
                  placeholder="Enter First Name"
                  key="signup_firstname"
                  onChange={handleChange}
                  type="text"
                  value={data.firstName}
                  name="firstName"
                  className="w-[100%]"
                  isRequired={true}
                  label="First Name"
                />
                {error.name && <ErrorText error="please enter the name" />}
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
                onClick={handleUpdate}
                id=""
                className="w-[100%]"
                size="medium"
                disabled={loading}
              >
                Update Profile
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
