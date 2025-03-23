export const validateCommaSeparatedValues = (input: string): {valid: boolean, error: string | null } => {
    const trimmedInput = input.trim();

    if (!trimmedInput) return { valid: false, error: "Input cannot be empty" };

    const regex = /^(?:\s*\w+\s*)(?:,\s*\w+\s*)*$/;

    if (!regex.test(trimmedInput)) {
        return { valid: false, error: "Invalid format: Ensure values are properly separated by commas." };
    }

    return { valid: true, error: null };
}

