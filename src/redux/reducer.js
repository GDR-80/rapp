import { initialState } from "./initialState";
import { storeItem, getItem } from "../localStorage";
import {
  ADD_USER,
  SET_SCREEN_MODE,
  UPDATE_USER,
  DELETE_USER,
  SET_SEARCH_TERM,
  DELETE_MESSAGE,
  SEND_MESSAGE,
  ADD_CONTACT,
  DELETE_CONTACT,
} from "./types";
import { generateRandomId } from "../utils";

export function reducer(state = getItem("store") || initialState, action) {
  switch (action.type) {
    case DELETE_CONTACT: {
      //defensive check
      if (!user.friends) return state;

      const user = { ...state.user };

      const indexOfFriend = user.friends.findIndex(
        (item) => item.id === action.payload.id
      );

      user.friends.splice(indexOfFriend, 1);

      const newState = { ...state, user };

      storeItem("store", newState);

      return newState;
    }

    case ADD_CONTACT: {
      const user = { ...state.user };

      const friends = user.friends ? user.friends : [];

      //check if already a friend, if so return with no change
      if (friends.includes(action.payload)) {
        return state;
      }

      friends.push(action.payload);

      user.friends = friends;

      const newState = { ...state, user };

      storeItem("store", newState);

      return newState;
    }

    case SET_SCREEN_MODE: {
      const newState = { ...state, screenMode: action.payload, loading: false };

      storeItem("store", newState);

      return newState;
    }

    case ADD_USER: {
      const user = {
        id: generateRandomId(64),
        userName: action.payload,
        blocked: [2, 6],
      };

      const newState = { ...state, user, screenMode: 4 };

      storeItem("store", newState);

      return newState;
    }

    case UPDATE_USER: {
      const user = { ...state.user };

      user.userName = action.payload.userName;

      const newState = { ...state, user };

      storeItem("store", newState);

      return newState;
    }

    case DELETE_USER: {
      const newState = { ...state, user: {} };

      storeItem("store", newState);

      return newState;
    }

    case SET_SEARCH_TERM: {
      const newState = { ...state, searchTerm: action.payload };

      return newState;
    }

    case DELETE_MESSAGE: {
      const messages = [...state.messages];

      const indexOfMessage = messages.findIndex(
        (item) => item.id === action.payload
      );

      messages.splice(indexOfMessage, 1);

      return { ...state, messages };
    }

    case SEND_MESSAGE: {
      const messages = [...state.messages];

      messages.push({
        id: generateRandomId(64),
        fromId: state.currentUserId,
        toId: action.payload.toId,
        content: action.payload.content,
        sendDate: Date.now(),
      });

      const newState = { ...state, messages };

      storeItem("store", newState);

      return newState;
    }

    default:
      return state;
  }
}
