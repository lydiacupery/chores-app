import { recordInfo } from "records/record";
import { UnsavedVote, SavedVote } from "records/vote-record";
import { UnsavedSnack, SavedSnack } from "records/snack-record";
import { UnsavedChore, SavedChore } from "records/chore-record";
import { SavedPerson, UnsavedPerson } from "records/person-record";
import { SavedChoreEvent, UnsavedChoreEvent } from "records/chore-event-record";
import {
  UnsavedPersonOrder,
  SavedPersonOrder
} from "records/person-order-record";
import {
  UnsavedCurrentTurnOrder,
  SavedCurrentTurnOrder
} from "./current-turn-record";
import { UnsavedUser, SavedUser } from "records/user-record";

export const VoteRecord = recordInfo<UnsavedVote, SavedVote>("votes");
export const SnackRecord = recordInfo<UnsavedSnack, SavedSnack>("snacks");
export const ChoreRecord = recordInfo<UnsavedChore, SavedChore>("chore");
export const PersonRecord = recordInfo<UnsavedPerson, SavedPerson>("person");
export const UserRecord = recordInfo<UnsavedUser, SavedUser>("users");
export const CurrentTurnRecord = recordInfo<
  UnsavedCurrentTurnOrder,
  SavedCurrentTurnOrder
>("currentturn");
export const ChoreEventRecord = recordInfo<UnsavedChoreEvent, SavedChoreEvent>(
  "choreevent"
);
export const PersonOrderRecord = recordInfo<
  UnsavedPersonOrder,
  SavedPersonOrder
>("personorder");
