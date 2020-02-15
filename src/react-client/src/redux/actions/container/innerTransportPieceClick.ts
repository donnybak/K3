import { Dispatch } from 'redux';
import { emit, FullState } from '../../';
import { ExitTransportContainerAction, INNER_TRANSPORT_PIECE_CLICK_ACTION, PieceType } from '../../../../../types';

/**
 * Move a piece from inside a transport to outside (adjacent land)
 */
export const innerTransportPieceClick = (selectedPiece: PieceType, containerPiece: PieceType) => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: typeof emit) => {
        // TODO: figure out if inner piece click is allowed
        // TODO: could probably see if there is even land next to where this piece is (don't allow if in the open ocean?)

        const clientAction: ExitTransportContainerAction = {
            type: INNER_TRANSPORT_PIECE_CLICK_ACTION,
            payload: {
                selectedPiece,
                containerPiece
            }
        };

        dispatch(clientAction);
        return;
    };
};
