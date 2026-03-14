// tests/main_loading.test.tsx
import { render, waitFor } from "@testing-library/react-native";
import React from "react";


// Mock DynamicImage
jest.mock("@/components/ui/DynamicImage", () => () => null);

// Mock auth context
jest.mock("@/hooks/use-auth-context", () => ({
  useAuthContext: () => ({
    logout: jest.fn(),
  }),
}));

// Mock vector icons
jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: () => null,
}));

jest.mock("@/context/notes_context", () => ({
  useFastNotes: jest.fn(),
}));

const mockUseFastNotes = require("@/context/notes_context").useFastNotes;

// Mock router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useFocusEffect: (callback: any) => callback(),
}));

// Importer HomeScreen ETTER mockene
import HomeScreen from "../app/(tabs)/index";

afterEach(() => {
  jest.clearAllMocks();
});

test("viser loader før notater lastes og skjuler den når data kommer", async () => {
  type Note = { id: string; title: string; text: string };

  mockUseFastNotes.mockReturnValueOnce({
    notes: [] as Note[],
    refresh: jest.fn(),
    loading: true,
  });

  const { getByTestId, queryByTestId, getByText, rerender } = render(<HomeScreen />);
  expect(getByTestId("loader")).toBeTruthy();

  mockUseFastNotes.mockReturnValueOnce({
    notes: [{ id: "1", title: "Test note", text: "Desc" }],
    refresh: jest.fn(),
    loading: false,
  });

  rerender(<HomeScreen />);

  await waitFor(() => {
    expect(queryByTestId("loader")).toBeNull();
    expect(getByText("Job Notes")).toBeTruthy();
    expect(getByText("Test note")).toBeTruthy();
  });
});