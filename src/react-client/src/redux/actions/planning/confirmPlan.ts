import { Dispatch } from 'redux';
import { emit, FullState } from '../../';
import { ConfirmPlanRequestAction, SERVER_CONFIRM_PLAN } from '../../../../../types';
import { setUserfeedbackAction } from '../setUserfeedbackAction';

/**
 * Action to confirm a list of moves as a plan for a piece.
 */
export const confirmPlan = () => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: typeof emit) => {
        const { gameboardMeta, planning } = getState();

        if (planning.bombardmentSelecting !== null || planning.missileSelecting !== null || planning.isUsingCapability) {
            dispatch(setUserfeedbackAction("Button doesn't apply to capability"));
            return;
        }

        if (planning.moves.length === 0 || !gameboardMeta.selectedPiece) {
            dispatch(setUserfeedbackAction("Can't submit an empty plan...or unselected piece."));
            return;
        }

        const clientAction: ConfirmPlanRequestAction = {
            type: SERVER_CONFIRM_PLAN,
            payload: {
                // TODO: send the piece, not just the id (even though only using the id on the server side anyway)
                pieceId: gameboardMeta.selectedPiece.pieceId,
                plan: planning.moves
            }
        };

        sendToServer(clientAction);
        return;
    };
};
