package com.urlshortener.url_shortener.util;

public class Base62Util {

    private static final String CHARACTERS =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    private static final int BASE = 62;

    public static String encode(long number) {

        if (number == 0) {
            return "0";
        }

        StringBuilder result = new StringBuilder();

        while (number > 0) {
            int remainder = (int) (number % BASE);
            result.append(CHARACTERS.charAt(remainder));
            number = number / BASE;
        }

        return result.reverse().toString();
    }

    public static long decode(String value) {

        long number = 0;

        for (int i = 0; i < value.length(); i++) {

            char character = value.charAt(i);

            int digit = CHARACTERS.indexOf(character);

            if (digit == -1) {
                throw new IllegalArgumentException(
                        "Invalid Base62 character: " + character
                );
            }

            number = number * BASE + digit;
        }

        return number;
    }
}