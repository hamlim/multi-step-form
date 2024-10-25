export type State =
  | {
      status: "name";
      formData: FormData;
    }
  | {
      status: "email";
      formData: FormData;
    }
  | {
      status: "note";
      formData: FormData;
    }
  | {
      status: "error";
      formData: FormData;
    }
  | {
      status: "complete";
      formData: FormData;
    };
