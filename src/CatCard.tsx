import * as React from "react";

import { ChangeEvent, useEffect, useState } from "react";
import { useCatFact } from "./UseCatFact";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./components/ui/button";

// Type definition for a breed object
interface Breed {
  id: string;
  name: string;
  description: string;
  life_span: string;
  child_friendly: number;
  vocalisation: number;
}

function CatBreedExplorer() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreedId, setSelectedBreedId] = useState<string>("");
  const [breedImages, setBreedImages] = useState<{ [key: string]: string }>({});
  const { funFact, fetchFact } = useCatFact();

  // Fetch breeds from The Cat API
  useEffect(() => {
    async function fetchBreeds() {
      const response = await fetch("https://api.thecatapi.com/v1/breeds");
      const data: Breed[] = await response.json();
      setBreeds(data);

      // Fetch images for all breeds
      const imagePromises = data.map((breed) =>
        fetch(
          `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`
        )
          .then((res) => res.json())
          .then((imageData) => {
            // Set the image for each breed in the state
            setBreedImages((prevImages) => ({
              ...prevImages,
              [breed.id]:
                imageData[0]?.url ||
                "https://media.istockphoto.com/id/1300144006/vector/black-cat-silhouette-on-white-background.jpg?s=612x612&w=0&k=20&c=VW6-p5P-KfRkvXTK_Hax_SnbuLpwLHfGok9kxyjfbQw=", // Store the image URL
            }));
          })
      );

      await Promise.all(imagePromises); // Wait for all images to be fetched
    }
    fetchBreeds();
  }, []);

  // Handle breed selection change
  const handleBreedChange = (value: string) => {
    // if value is the string "All", i dont want to filter by breed i want to show all breeds
    if (value === "All") {
      setSelectedBreedId("");
      return;
    }
    setSelectedBreedId(value);
  };

  return (
    <div className="container">
      <h1 className="text-6xl my-5 text-center">Cat Breed Explorer</h1>
      <h2 className="text-3xl my-5 text-left">Fun fact!</h2>
      <p className="text-left">{funFact}</p>
      <div className="flex justify-start my-5" >
        <Button onClick={fetchFact}>Get a new fact</Button>
      </div>
      <Select onValueChange={handleBreedChange} value={selectedBreedId}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a breed" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Breeds</SelectLabel>
            <SelectItem value="All">All</SelectItem>
            {breeds.map((breed) => (
              <SelectItem key={breed.id} value={breed.id}>
                {breed.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 */}
      <div className="flex flex-wrap justify-evenly gap-4 ">
        {breeds
          .filter((breed) => !selectedBreedId || breed.id === selectedBreedId) // Show all or filtered by selection
          .map((breed) => (
            // <div key={breed.id}>
            <Card className="rounded-lg my-5 w-[350px] text-center shadow-md transition-transf items-stretch ease-in-out duration-300 hover:scale-105">
              {breedImages[breed.id] && (
                <img
                  src={breedImages[breed.id]}
                  alt={`${breed.name}`}
                  className="w-full h-[250px] object-cover object-[50%_0%] rounded-t-lg"
                />
              )}
              <div className="m-5">
                <CardTitle className="text-3xl text-left mb-5">
                  {breed.name}
                </CardTitle>

                <CardContent className="pl-0 pr-0">
                  <div className="flex flex-wrap justify-between">
                    <div>
                      <p>
                        <strong>Life Span:</strong>
                      </p>
                      <p>{breed.life_span} </p>
                    </div>
                    <div>
                      <p>
                        <strong>Child Friendly:</strong>
                      </p>
                      <p>{breed.child_friendly}/5</p>
                    </div>
                    <div>
                      <p>
                        <strong>Vocalisation:</strong>
                      </p>
                      <p>{breed.vocalisation}/5</p>
                    </div>
                  </div>
                  <p className="text-left mt-5">{breed.description}</p>
                </CardContent>
              </div>
            </Card>
            // </div>
          ))}
      </div>
    </div>
  );
}

export default CatBreedExplorer;
