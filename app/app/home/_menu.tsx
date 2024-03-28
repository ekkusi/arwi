import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { useMatomo } from "matomo-tracker-react-native";
import CButton from "@/components/primitives/CButton";
import { COLORS } from "@/theme";
import CModal from "@/components/modals/CModal";
import CView from "@/components/primitives/CView";
import { HomeStackParams } from "./types";
import { graphql } from "@/graphql";
import { useAuth, useAuthenticatedUser } from "@/hooks-and-providers/AuthProvider";
import { MATOMO_ACTIONS, MATOMO_EVENT_CATEGORIES } from "@/config";

const HomeMenu_Logout_Mutation = graphql(`
  mutation HomeMenu_Logout {
    logout
  }
`);

export default function HomeMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation<NavigationProp<HomeStackParams>>();
  const { t } = useTranslation();
  const { logout } = useAuth();
  const user = useAuthenticatedUser();
  const { trackEvent } = useMatomo();

  const [logoutMutation, { client }] = useMutation(HomeMenu_Logout_Mutation);

  const handleLogout = async () => {
    await logoutMutation();
    await client.clearStore();
    setIsMenuOpen(false);
    trackEvent({
      category: MATOMO_EVENT_CATEGORIES.AUTH,
      action: MATOMO_ACTIONS.AUTH.LOGOUT,
      userInfo: {
        uid: user.id,
      },
    });
    logout();
  };

  const navigateAndCloseModal: typeof navigation.navigate = (...args: Parameters<typeof navigation.navigate>) => {
    navigation.navigate(...args);
    setIsMenuOpen(false);
  };

  return (
    <>
      <CButton variant="empty" onPress={() => setIsMenuOpen(true)}>
        <Ionicons name="menu" size={26} color={COLORS.white} />
      </CButton>
      <CModal placement="left" isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} closeButton={false}>
        <CView style={{ flex: 1, width: "100%", justifyContent: "space-between", alignItems: "center", paddingVertical: "2xl" }}>
          <CView style={{ flex: 1, width: "100%", alignItems: "flex-start", gap: "2xl" }}>
            <CButton
              variant="empty"
              title={t("home", "Etusivu")}
              onPress={() => navigateAndCloseModal("home")}
              colorScheme="primary"
              textStyle={{ fontSize: "xl" }}
              leftIcon={<EntypoIcon name="home" size={23} color={COLORS.primary} />}
              style={{ gap: "xl" }}
            />
            <CButton
              variant="empty"
              colorScheme="darkgray"
              onPress={() => navigateAndCloseModal("profile")}
              title={t("profile", "Profiili")}
              textStyle={{ fontSize: "xl", fontWeight: "500" }}
              leftIcon={<Ionicons name="person" size={23} color={COLORS.darkgray} />}
              style={{ gap: "xl" }}
            />
            <CButton
              variant="empty"
              colorScheme="darkgray"
              onPress={() => navigateAndCloseModal("archive")}
              title={t("archive", "Arkisto")}
              textStyle={{ fontSize: "xl", fontWeight: "500" }}
              leftIcon={<EntypoIcon name="archive" size={23} color={COLORS.darkgray} />}
              style={{ gap: "xl" }}
            />
          </CView>
          <CButton variant="empty" textStyle={{ fontSize: "lg", fontWeight: "500" }} title={t("logout", "Kirjaudu ulos")} onPress={handleLogout} />
        </CView>
      </CModal>
    </>
  );
}
