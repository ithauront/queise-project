
import { rest } from 'msw';

export const handlers = [
  rest.post('URL_DO_BACKEND_QUE_AINDA_NAO_FOI_FEITA', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),

];
