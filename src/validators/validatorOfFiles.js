export const validatorOfFiles =
    (formatFile, memoryPerFile, memoryAllFiles) => value => {
        const error = {};
        const limitPerFile = 3145728;
        const limitForAllFiles = 15728640;

        value.map(({ file }) => {
            if (
                !file.type.endsWith("jpg") &&
                !file.type.endsWith("jpeg") &&
                !file.type.endsWith("png")
            ) {
                error.value = error.value
                    ? error.value + ` ${file.name},`
                    : ` ${file.name},`;
            }
            return file;
        });

        if (error.value !== undefined) {
            error.value = (formatFile + error.value).slice(0, -1);
            return error.value;
        }

        value.map(({ file }) => {
            if (file.size > limitPerFile) {
                error.value = error.value
                    ? error.value + ` ${file.name},`
                    : ` ${file.name},`;
            }
            return file;
        });

        if (error.value !== undefined) {
            error.value = (memoryPerFile + error.value).slice(0, -1);
            return error.value;
        }

        const sizeAllFiles = value.reduce(
            (total, amount) => total + amount.file.size,
            0
        );

        if (sizeAllFiles > limitForAllFiles) {
            error.value = memoryAllFiles;
            return error.value;
        }

        return error.value;
    };
