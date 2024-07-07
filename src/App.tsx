import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";

import RantSheet from "./containers/RantModal";
import { Fragment, useState } from "react";
import CreateDrawer from "./containers/CreateDrawer";
import RantCard from "./components/card/RantCard";
import { Rant, RantPayload } from "./interface/rant";
import LoadingScreen from "./containers/LoadingScreen";
import ErrorScreen from "./containers/ErrorScreen";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import useQueryRant from "./hooks/useQueryRant";

function App() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { query } = useQueryRant();
  const queryClient = useQueryClient();

  const handleSelectRant = (id: string) => {
    queryClient.invalidateQueries({ queryKey: ["rant-selected"] });
    setOpenModal((prev) => !prev);
    setSelectedCard(id);
  };

  if (query.isLoading) return <LoadingScreen />;
  if (query.isError) return <ErrorScreen />;

  const { pages } = query.data as InfiniteData<RantPayload>;

  console.log(pages);

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

        <>
          {pages?.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  max-w-7xl mx-auto ">
              {pages.map(({ rants }: RantPayload, index: number) => (
                <Fragment key={index}>
                  {rants?.map((rant: Rant, index: number) => (
                    <RantCard
                      key={rant.id}
                      index={index}
                      {...rant}
                      onSelect={() => handleSelectRant(rant.id)}
                    />
                  ))}
                </Fragment>
              ))}
            </div>
          ) : (
            <h2 className="text-[32px] font-lovelo text-center">
              No Available Data
            </h2>
          )}
        </>

        <div className="w-full  mt-4 flex justify-center items-center">
          <Button
            onClick={() => query.fetchNextPage()}
            disabled={query.isFetching}
          >
            {query.isFetching ? "Loading..." : "Load more"}
          </Button>
        </div>
      </main>

      <RantSheet
        selected={selectedCard || null}
        setSelected={setSelectedCard}
        open={openModal}
        onOpenChange={setOpenModal}
      />

      <CreateDrawer open={openDrawer} onOpenChange={setOpenDrawer} />
    </>
  );
}

export default App;
