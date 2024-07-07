import { Card, CardFooter, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { FC } from "react";

interface Props {
  comment: string;
}

const CommentCard: FC<Props> = ({ comment }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <CardContent className="break-all p-2">{comment}</CardContent>
      </CardContent>
      <Separator />
      <CardFooter className="space-x-4 p-4">
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
  );
};

export default CommentCard;
