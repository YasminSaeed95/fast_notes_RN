jest.mock("@/components/ui/DynamicImage", () => () => null);
jest.mock("@/hooks/use-auth-context", () => ({
  useAuthContext: () => ({
    logout: jest.fn(),
  }),
}));
jest.mock("@/context/notes_context", () => ({
  useFastNotes: () => ({
    notes: [],
    refresh: jest.fn(),
    loading: false,
  }),
}));
jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: () => null,
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useFocusEffect: (callback: any) => callback(),
}));

jest.mock("@/lib/supabase", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() =>
          Promise.resolve({
            data: [{ id: "1", title: "Test note", description: "Desc" }],
            error: null,
          })
        ),
      })),
    })),
  },
}));


import { render, waitFor } from "@testing-library/react-native";
import React from "react";
import HomeScreen from "../app/(tabs)/index";

test("viser hovedskjerm uten krasj for ikke-innlogget bruker", async () => {
  const { getByText } = render(<HomeScreen />);
  await waitFor(() => {
    expect(getByText("Job Notes")).toBeTruthy();
  });
});