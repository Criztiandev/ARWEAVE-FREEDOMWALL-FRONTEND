import { Card, CardFooter, CardHeader } from "./components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";
import { Badge } from "./components/ui/badge";
import RantSheet from "./containers/RantModal";
import { useState } from "react";
import CreateDrawer from "./containers/CreateDrawer";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const tempText = `  Over the years we've featured hundreds of UI kits on UXCrush, but
              Untitled UI is by far the most comprehensive and detailed I've
              seen yet. A must have for any designer!.  Over the years we've featured hundreds of UI kits on UXCrush, but
              Untitled UI is by far the most comprehensive and detailed I've
              seen yet. A must have for any designer!.`;

  const handleSelectRant = () => {
    setOpenModal((prev) => !prev);
  };
  return (
    <>
      <main className="p-4 relative min-h-screen max-w-7xl mx-auto">
        <section className="my-4 h-screen flex justify-center items-center">
          <div className="flex justify-center items-center flex-col gap-12">
            <div className="space-y-4">
              <h1 className="text-[84px] text-center font-bold font-lovelo">
                Arweave Freedom Wall
              </h1>

              <p className="text-center w-[800px] mx-auto">
                Your voice matters, and now it can echo through time. This
                freedom wall, powered by Arweave's permanent storage, ensures
                your thoughts, ideas, and expressions will remain uncensored and
                accessible forever. Before you post, remember: your words will
                become an immutable part of history. Use this platform wisely to
                share what truly deserves to be eternal.
              </p>
            </div>

            <Button
              className="mx-auto w-[300px]"
              onClick={() => setOpenDrawer((prev) => !prev)}
            >
              Create
            </Button>
          </div>
        </section>

        <Separator className="mt-8 mb-12" />
        <div className="grid grid-cols-4 gap-4 mb-4 ">
          <motion.div whileHover={{ scale: 1.03 }} onClick={handleSelectRant}>
            <Card className="hover:cursor-pointer">
              <CardHeader>
                {tempText.length > 200 ? (
                  <div className="block">
                    <span>{`${tempText.substring(0, 200)}... `}</span>
                    <Badge>Read More</Badge>
                  </div>
                ) : (
                  tempText
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
        </div>
      </main>

      <RantSheet open={openModal} onOpenChange={setOpenModal} />
      <CreateDrawer open={openDrawer} onOpenChange={setOpenDrawer} />
    </>
  );
}

export default App;
