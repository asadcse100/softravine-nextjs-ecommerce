import Link from "next/link";
import Image from "next/image";
import { Chat } from "@/app/admin/types/chat";

const chatData: Chat[] = [
  {
    avatar: "/images/user/user-01.png",
    name: "Devid Heilo",
    text: "How are you?",
    time: 12,
    textCount: 3,
    dot: 3,
  },
  {
    avatar: "/images/user/user-02.png",
    name: "Henry Fisher",
    text: "Waiting for you!",
    time: 12,
    textCount: 0,
    dot: 1,
  },
  {
    avatar: "/images/user/user-04.png",
    name: "Jhon Doe",
    text: "What's up?",
    time: 32,
    textCount: 0,
    dot: 3,
  },
  {
    avatar: "/images/user/user-05.png",
    name: "Jane Doe",
    text: "Great",
    time: 32,
    textCount: 2,
    dot: 6,
  },
  {
    avatar: "/images/user/user-01.png",
    name: "Jhon Doe",
    text: "How are you?",
    time: 32,
    textCount: 0,
    dot: 3,
  },
  {
    avatar: "/images/user/user-03.png",
    name: "Jhon Doe",
    text: "How are you?",
    time: 32,
    textCount: 3,
    dot: 6,
  },
];

const ChatCard = () => {
  return (
    <div className="p-5 col-span-12 rounded-sm border border-stroke bg-slate-300 py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-slate-300">
      Recent Customer(s)
      </h4>

      <div>
        {chatData.map((chat, key) => (
          <Link
            href="/"
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-slate-300">
                  {chat.name}
                </h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;
