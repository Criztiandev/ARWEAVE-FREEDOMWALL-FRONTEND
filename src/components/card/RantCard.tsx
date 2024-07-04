import { FC } from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion } from "framer-motion";

interface Props {
  rant: string;
  id: string;
  index: number;
  onSelect: () => void;
}

const RantCard: FC<Props> = ({ index, rant, onSelect }) => {
  return (
    <motion.div whileHover={{ scale: 1.03 }} onClick={onSelect}>
      <Card className="hover:cursor-pointer w-full h-full ">
        <CardHeader className="tex-wrap overflow-hidden  min-h-[145px] ">
          {rant.length > 200 ? (
            <div className="">
              <p>{`${rant.substring(0, 200)}... `}</p>
              <Badge>Read More</Badge>
            </div>
          ) : (
            <p className="flex-shrink w-full overflow-hidden">{rant}</p>
          )}
        </CardHeader>

        <CardFooter className="space-x-4">
          <Avatar className="size-[48px]">
            <AvatarImage src="https://github.com/shadcn.ng" />
            <AvatarFallback>W</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold">Unknown User #{index + 1}</h3>
            <span className="text-[14px]">Weaver</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RantCard;
