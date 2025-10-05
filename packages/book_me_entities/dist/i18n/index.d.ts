export type Locale = "en" | "it";
export declare function setLocale(locale: Locale): void;
export declare function getLocale(): Locale;
export declare function getPersonTranslations(): {
    readonly firstName: {
        readonly required: "First name is required";
        readonly minLength: "First name must be at least 1 character";
    };
    readonly lastName: {
        readonly required: "Last name is required";
        readonly minLength: "Last name must be at least 1 character";
    };
} | {
    readonly firstName: {
        readonly required: "Il nome è obbligatorio";
        readonly minLength: "Il nome deve essere di almeno 1 carattere";
    };
    readonly lastName: {
        readonly required: "Il cognome è obbligatorio";
        readonly minLength: "Il cognome deve essere di almeno 1 carattere";
    };
};
export declare function getUserTranslations(): {
    readonly email: {
        readonly required: "Email is required";
        readonly invalid: "Invalid email format";
    };
    readonly password: {
        readonly required: "Password is required";
        readonly minLength: "Password must be at least 8 characters";
    };
    readonly phoneNumber: {
        readonly invalid: "Invalid phone number format";
    };
} | {
    readonly email: {
        readonly required: "L'email è obbligatoria";
        readonly invalid: "Formato email non valido";
    };
    readonly password: {
        readonly required: "La password è obbligatoria";
        readonly minLength: "La password deve essere di almeno 8 caratteri";
    };
    readonly phoneNumber: {
        readonly invalid: "Formato numero di telefono non valido";
    };
};
