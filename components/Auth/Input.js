import { View, Text, TextInput, StyleSheet } from "react-native";

import colors from "../../constants/colors";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
}) {
  return (
    <View style={styles.inputContainer}>
      {/* <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text> */}
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        // autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
  },
  labelInvalid: {
    color: colors.error,
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: colors.grey,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: colors.error,
  },
});
