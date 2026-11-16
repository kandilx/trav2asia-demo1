import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ExperienceModal } from "@/components/experiences/ExperienceModal";
import { TripProvider, useTrip, initialTripState } from "@/components/trip/TripProvider";
import { estimateTotal, formatCad, getExperience } from "@/lib/catalog";

const experienceId = "bali-sunrise-volcano-hike";

function OpenButton({ id }: { id: string }) {
  const { openExperience } = useTrip();
  return (
    <button type="button" onClick={() => openExperience(id)}>
      Open experience
    </button>
  );
}

function renderModal(id = experienceId) {
  return render(
    <TripProvider>
      <OpenButton id={id} />
      <ExperienceModal />
    </TripProvider>,
  );
}

describe("ExperienceModal", () => {
  it("shows a demo estimate that matches the traveler count", async () => {
    const user = userEvent.setup();
    const experience = getExperience(experienceId);
    if (!experience) throw new Error("Missing spotlight experience");
    const travelers = initialTripState.search.travelers;

    renderModal();
    await user.click(screen.getByRole("button", { name: "Open experience" }));

    expect(screen.getByRole("heading", { name: experience.title })).toBeVisible();
    expect(screen.getByText(`Demo estimate: ${formatCad(estimateTotal(experience.priceCad, travelers))}`)).toBeVisible();
  });

  it("asks for a date before confirming the demo booking", async () => {
    const user = userEvent.setup();
    renderModal();
    await user.click(screen.getByRole("button", { name: "Open experience" }));
    await user.click(screen.getByRole("button", { name: "Confirm demo booking" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Choose a date for your demo booking.");
    expect(screen.queryByText(/Demo confirmation/)).not.toBeInTheDocument();
  });

  it("labels a simulated confirmation as a demo with no payment taken", async () => {
    const user = userEvent.setup();
    renderModal();
    await user.click(screen.getByRole("button", { name: "Open experience" }));
    fireEvent.change(document.getElementById("modal-date") as HTMLInputElement, { target: { value: "2099-06-15" } });
    await user.click(screen.getByRole("button", { name: "Confirm demo booking" }));

    expect(await screen.findByText(/Demo confirmation\. No booking was made and no payment was taken\./)).toBeVisible();
    expect(screen.getByText(/Reference DEMO-/)).toBeVisible();
  });

  it("closes from the close button and releases the scroll lock", async () => {
    const user = userEvent.setup();
    const { container } = renderModal();
    await user.click(screen.getByRole("button", { name: "Open experience" }));
    expect(document.documentElement).toHaveClass("modal-open");

    await user.click(screen.getByRole("button", { name: "Close experience details" }));

    await waitFor(() => expect(container.querySelector("dialog")).not.toHaveAttribute("open"));
    expect(document.documentElement).not.toHaveClass("modal-open");
  });
});
