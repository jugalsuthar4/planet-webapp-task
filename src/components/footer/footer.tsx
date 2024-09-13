import avatar from '@/assets/avatar.jpg';
const Footer = () => {
  return (
    <div className="flex items-center justify-between w-[90%] p-10 ">
      <div className="flex items-center gap-1">
        <p className="text-xs md:text-base">Privacy Policy | FAQ </p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div>
          <img
            src={avatar.src}
            alt="avatar"
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
        <div className="text-xs md:text-base">
          <p className=" text-gray-600">Questions ?</p>
          <p>Talk to our experts ?</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
