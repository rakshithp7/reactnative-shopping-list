import { View } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import BodyScrollView from '@/components/ui/BodyScrollView';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import TextInput from '@/components/ui/TextInput';
import { ClerkAPIError } from '@clerk/types';
import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo';

export default function SignUp() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setErrors([]);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setPendingVerification(true);
    } catch (error) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setErrors([]);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <TextInput
          value={code}
          label={`Enter the verification code we sent to ${emailAddress}`}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <Button onPress={onVerifyPress} disabled={!code || isLoading} loading={isLoading}>
          Verify
        </Button>
        {errors.map((error) => (
          <ThemedText key={error.longMessage} style={{ color: 'red' }}>
            {error.longMessage}
          </ThemedText>
        ))}
      </BodyScrollView>
    );
  }

  return (
    <BodyScrollView
      contentContainerStyle={{
        padding: 16,
      }}>
      <TextInput
        label="Email"
        value={emailAddress}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmailAddress}
      />
      <TextInput
        label="Password"
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button onPress={onSignUpPress} loading={isLoading} disabled={!emailAddress || !password || isLoading}>
        Continue
      </Button>

      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: 'red' }}>
          {error.longMessage}
        </ThemedText>
      ))}

      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <ThemedText>Already have an account?</ThemedText>
        <Button onPress={() => router.push('/')} variant="ghost">
          Sign In
        </Button>
      </View>
    </BodyScrollView>
  );
}
