import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";

import RantSheet from "./containers/RantModal";
import { useState } from "react";
import CreateDrawer from "./containers/CreateDrawer";
import useRant from "./hooks/useRant";
import RantCard from "./components/card/RantCard";
import { rantSchema } from "./interface/rant";
import LoadingScreen from "./containers/LoadingScreen";
import ErrorScreen from "./containers/ErrorScreen";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { query } = useRant();

  const handleSelectRant = () => {
    setOpenModal((prev) => !prev);
  };

  if (query.isLoading) return <LoadingScreen />;
  if (query.isError) return <ErrorScreen />;

  return (
    <>
      <main className="relative min-h-screen p-4">
        <section className="my-4 h-screen flex justify-center items-center max-w-7xl mx-auto">
          <div className="flex justify-center items-center flex-col gap-4">
            <div className="space-y-4 ">
              <h1 className="font-lovelo text-6xl text-center sm:text-[72px] md:text-[94px]">
                Arweave Freedom Wall
              </h1>

              <p className="text-center max-w-[900px] mx-auto">
                Your voice matters, and now it can echo through time. This
                freedom wall, powered by Arweave's permanent storage, ensures
                your thoughts, ideas, and expressions will remain uncensored and
                accessible forever. Before you post, remember: your words will
                become an immutable part of history. Use this platform wisely to
                share what truly deserves to be eternal.
              </p>
            </div>

            <Button
              className="w-full max-w-72 mx-auto my-4"
              onClick={() => setOpenDrawer((prev) => !prev)}
            >
              Create
            </Button>
          </div>
        </section>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  max-w-7xl mx-auto ">
          {query.data && query?.data?.length > 0 ? (
            query.data?.map((props: rantSchema, index: number) => (
              <RantCard
                key={props.id}
                index={index}
                {...props}
                onSelect={handleSelectRant}
              />
            ))
          ) : (
            <>
              <h1 className="text-[32px] font-lovelo text-center">
                No Available Rant
              </h1>
            </>
          )}
        </div>
      </main>

      <RantSheet open={openModal} onOpenChange={setOpenModal} />
      <CreateDrawer open={openDrawer} onOpenChange={setOpenDrawer} />
    </>
  );
}

export default App;
