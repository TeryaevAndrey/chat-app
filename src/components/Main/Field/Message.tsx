import React, {FC} from 'react';

interface IMessage {
  message: string;
  my: boolean;
}

const Message: FC<IMessage> = ({message, my}) => {
  return (
    <div className={`py-[8px] px-[11px] ${my ? "bg-[#5EA4CC]" : "bg-[#5284A0]"} w-[max-content] rounded-[10px]`}>
      {message}
    </div>
  );
};

export default Message;