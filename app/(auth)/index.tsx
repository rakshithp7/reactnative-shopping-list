import { View } from 'react-native';
import { useCallback, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import BodyScrollView from '@/components/ui/BodyScrollView';
import { ClerkAPIError } from '@clerk/types';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;
    setIsSigningIn(true);
    setErrors([]);

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.error(JSON.stringify(error, null, 2));
    } finally {
      setIsSigningIn(false);
    }
  }, [isLoaded, emailAddress, password]);

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
      <Button onPress={onSignInPress} loading={isSigningIn} disabled={!emailAddress || !password || isSigningIn}>
        Sign In
      </Button>

      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: 'red' }}>
          {error.longMessage}
        </ThemedText>
      ))}

      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <ThemedText>Don't have an account?</ThemedText>
        <Button onPress={() => router.push('/sign-up')} variant="ghost">
          Sign Up
        </Button>
      </View>

      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <ThemedText>Forgot password?</ThemedText>
        <Button onPress={() => router.push('/reset-password')} variant="ghost">
          Reset Password
        </Button>
      </View>
    </BodyScrollView>
  );
}
