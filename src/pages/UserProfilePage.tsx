import { FC, useEffect, useState } from "react";
import { getUserProfile, UserProfile } from "../components/User/profile";
import { useErrorContext } from "../components/Core/Error";
import { Card, CardContent, Container, Typography } from "@mui/material";

export const UserProfilePage: FC = () => {
    const { setError } = useErrorContext();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    useEffect(() => {
        getUserProfile().then((p) => {
            setUserProfile(p);
        }).catch((e) => {
            setError(`${e}`)
        })
    }, [])
    return <div>
        <Container className="py-8">
            <Card>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        ユーザープロフィール
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        ID: {userProfile?.id}
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        メールアドレス: {userProfile?.email}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    </div>
}