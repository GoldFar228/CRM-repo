import HeaderComponent from "@/components/Header"
import { PageContainer } from "@ant-design/pro-components"

const AuthPage: React.FC = () => {


    return (
        <PageContainer ghost>
            <div>
                <HeaderComponent />
            </div>
        </PageContainer>
    )
}

export default AuthPage