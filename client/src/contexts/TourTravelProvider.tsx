import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  TourTravelsActionsType,
  TourTravelType,
} from "../components/Admin/types";
import {
  createToursReducer,
  initialToursState,
  TourTravelProviderActions,
} from "./TourTravelProviderReducer";
import { useParams } from "react-router-dom";
import { get } from "../service";

export type CreateTourContextProps = {
  state: TourTravelType;
  dispatch: Dispatch<TourTravelProviderActions>;
  isEdit: boolean;
  isPusblished: boolean;
  fetchTour?: () => Promise<void>;
};

const TourTravelContext = createContext<CreateTourContextProps>({
  state: initialToursState,
  dispatch: () => undefined,
  isEdit: false,
  isPusblished: false,
  fetchTour: async () => undefined,
});

export const TourTravelProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(createToursReducer, initialToursState);
  console.log("state", state);
  const fetchTour = async () => {
    const response = await get<{
      result: TourTravelType["tours"];
    }>(`tours/${id || state?.tours?._id}`);
    if (response?.data?.result) {
      console.log("iam called");
      dispatch({
        type: TourTravelsActionsType.GET_TOURS,
        payload: { ...response.data.result },
      });
    }
  };

  useEffect(() => {
    if (id && id?.toString() && id?.toString().length > 9) {
      fetchTour();
    }
  }, [id]);

  const isEdit = useMemo(() => Boolean(state.tours?._id), [state?.tours?._id]);
  const isPusblished = useMemo(() => Boolean(), []);

  return (
    <TourTravelContext.Provider
      value={{ state, dispatch, isEdit, isPusblished, fetchTour }}
    >
      {children}
    </TourTravelContext.Provider>
  );
};

export const useCreateTours = () => {
  return useContext(TourTravelContext);
};
