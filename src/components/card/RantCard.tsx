import { FC } from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Rant } from "@/interface/rant";

interface Props extends Rant {
  id: string;
  index: number;
  onSelect: () => void;
}

const RantCard: FC<Props> = ({ rant, category, createdAt, onSelect }) => {
  const currentDate = new Date(createdAt || "").toLocaleDateString();
  return (
    <motion.div whileHover={{ scale: 1.03 }} onClick={onSelect}>
      <Card className="hover:cursor-pointer w-full h-[300px] flex flex-col justify-between">
        <CardHeader className="tex-wrap overflow-hidden justify-between flex flex-col border h-full ">
          {rant?.length > 200 ? (
            <div className="">
              <p className="break-all">{`${rant.substring(0, 100)}... `}</p>
            </div>
          ) : (
            <p className="flex-shrink w-full overflow-hidden break-all">
              {rant}
            </p>
          )}

          <div className="flex justify-between items-center">
            <Badge className="bg-[#0097e6] capitalize">{category}</Badge>
            <div className="text-[14px]">{currentDate}</div>
          </div>
        </CardHeader>

        <CardFooter className="space-x-4 mt-4">
          <Avatar className="size-[48px]">
            <AvatarImage src="" />
            <AvatarFallback>W</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold">Unknown User </h3>
            <span className="text-[14px]">Weaver</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RantCard;
