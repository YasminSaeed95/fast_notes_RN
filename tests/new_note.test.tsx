jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

jest.mock('@/context/notes_context', () => ({
  useFastNotes: () => ({
    addNote: jest.fn(),
  }),
}));

jest.mock('@/components/ui/AddPicture', () => () => null);

jest.mock('@/lib/supabase', () => ({
  supabase: {
    storage: {
      from: () => ({
        upload: jest.fn(),
        getPublicUrl: () => ({ data: { publicUrl: 'test-url' } }),
      }),
    },
  },
}));

import { render } from '@testing-library/react-native';
import React from 'react';
import NewNoteScreen from '../app/new_note';

describe('NewNoteScreen', () => {
  it('renders inputs', () => {
    const { getByPlaceholderText } = render(<NewNoteScreen />);
 
    expect(getByPlaceholderText('Title')).toBeTruthy();
    expect(getByPlaceholderText('Write your note here...')).toBeTruthy();
  });
});