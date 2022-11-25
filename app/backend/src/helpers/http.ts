export const badRequest = (info: string) => ({
  type: 401,
  message: info,
});

export const unauthorized = (info: string) => ({
  type: 401,
  message: info,
});

export type ResLog = {
  token: string,
};

export const okRequest = (data: ResLog) => {
  if (data.token) {
    return {
      type: 200,
      message: {
        token: data,
      },
    };
  }
};
