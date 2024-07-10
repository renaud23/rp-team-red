import { Box, Button, TextField, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  switchBulletin,
  fetchBulletins,
  selectStatus,
  selectIsLastBulletin,
  selectBulletinCourant,
  selectNextId,
  selectPreviousId,
  selectIsFirstBulletin,
} from "../features/bulletins/repriseSlice";

export function RepriseBulletin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idBulletin } = useParams();
  const status = useSelector(selectStatus);
  const isLastBulletin = useSelector(selectIsLastBulletin);
  const bulletinCourant = useSelector(selectBulletinCourant);
  const nextId = useSelector(selectNextId);
  const previousId = useSelector(selectPreviousId);
  const isFirstBulletin = useSelector(selectIsFirstBulletin);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBulletins());
    } else if (status === "fulfilled") {
      if (idBulletin) {
        const parsed = parseInt(idBulletin);
        if (Number.isInteger(parsed)) {
          dispatch(switchBulletin(parsed));
        }
      } else {
        // TODO traiter les erreurs
      }
    }
  }, [dispatch, idBulletin, status]);

  const onNext = useCallback(() => {
    if (nextId) {
      navigate(`/reprise/bulletins/${nextId}`);
    }
  }, [navigate, nextId]);

  const onPrevious = useCallback(() => {
    if (previousId) {
      navigate(`/reprise/bulletins/${previousId}`);
    }
  }, [navigate, previousId]);

  if (!bulletinCourant) {
    return <>no bulletinCourant or loading...</>;
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        <TextField
          label="Id"
          id="id-bulletin"
          value={bulletinCourant.id}
          disabled={true}
        />
        <TextField
          label="Raison Sociale"
          id="raison-sociale"
          value={bulletinCourant.raisonSociale}
          disabled={true}
        />
      </Typography>
      <Button
        variant="contained"
        disabled={isFirstBulletin}
        onClick={onPrevious}
      >
        Précédant
      </Button>
      <Button variant="contained" disabled={isLastBulletin} onClick={onNext}>
        Suivant
      </Button>
    </Box>
  );
}
