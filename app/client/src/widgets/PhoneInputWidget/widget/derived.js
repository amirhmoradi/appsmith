export default {
  isValid: (props, moment, _) => {
    let hasValidValue, value;
    value = props.text;
    hasValidValue = !!value;

    if (!props.isRequired && !hasValidValue) {
      return true;
    }
    if (props.isRequired && !hasValidValue) {
      return false;
    }

    if (typeof props.validation === "boolean" && !props.validation) {
      return false;
    }

    let parsedRegex = null;
    if (props.regex) {
      /*
       * break up the regexp pattern into 4 parts: given regex, regex prefix , regex pattern, regex flags
       * Example /test/i will be split into ["/test/gi", "/", "test", "gi"]
       */
      const regexParts = props.regex.match(/(\/?)(.+)\\1([a-z]*)/i);

      if (!regexParts) {
        parsedRegex = new RegExp(props.regex);
      } else {
        /*
        * if we don't have a regex flags (gmisuy), convert provided string into regexp directly
        /*
        if (regexParts[3] && !/^(?!.*?(.).*?\\1)[gmisuy]+$/.test(regexParts[3])) {
          parsedRegex = RegExp(props.regex);
        }
        /*
        * if we have a regex flags, use it to form regexp
        */
        parsedRegex = new RegExp(regexParts[2], regexParts[3]);
      }
    } else {
      parsedRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    }

    if (parsedRegex) {
      return parsedRegex.test(props.text);
    } else {
      return hasValidValue;
    }
  },
  //
};
