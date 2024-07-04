import { FC } from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion } from "framer-motion";

interface Props {
  rant: string;
  id: string;
  onSelect: () => void;
}

const RantCard: FC<Props> = ({ rant, onSelect }) => {
  return (
    <motion.div whileHover={{ scale: 1.03 }} onClick={onSelect}>
      <Card className="hover:cursor-pointer">
        <CardHeader>
          {rant.length > 200 ? (
            <div className="block">
              <span>{`${rant.substring(0, 200)}... `}</span>
              <Badge>Read More</Badge>
            </div>
          ) : (
            <div className="block">{rant}</div>
          )}
        </CardHeader>

        <CardFooter className="space-x-4">
          <Avatar className="size-[48px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold">Unknown User</h3>
            <span className="text-[14px]">Weaver</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RantCard;
