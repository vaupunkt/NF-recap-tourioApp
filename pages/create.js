import Link from "next/link.js";
import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form.js";
import useSWR from "swr";
import { StyledLink } from "../components/StyledLink.js";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const router = useRouter();
  const { mutate } = useSWR("/api/places");

  async function addPlace(place) {
    const response = await fetch("api/places", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(place),
    });
    if (response.ok) {
      mutate();
      router.push("/");
    }
    console.log("Place added (but not really...)");
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <Link href="/" passHref legacyBehavior>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}
