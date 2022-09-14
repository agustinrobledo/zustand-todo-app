import create from "zustand";
import { createClient } from "@liveblocks/client";
import { middleware } from "@liveblocks/zustand";

const client = createClient({
  publicApiKey: "pk_live_i5rzwc_yE76eP4U7ZE3pVBzy",
});

const useStore = create(
  middleware(
    (set) => ({
      draft: "",
      isTyping: false,
      todos: [],
      setDraft: (draft) =>
        set({ draft, isTyping: draft === "" ? false : true }),
      addTodo: () =>
        set((state) => ({
          todos: state.todos.concat({ text: state.draft }),
          draft: "",
        })),
      deleteTodo: (index) =>
        set((state) => ({
          todos: state.todos.filter((todo, i) => index !== i),
        })),
    }),
    {
      client,
      presenceMapping: { isTyping: true },
      storageMapping: { todos: true },
    }
  )
);

export default useStore;
