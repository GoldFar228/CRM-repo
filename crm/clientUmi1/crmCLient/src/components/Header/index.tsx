import { PageContainer } from "@ant-design/pro-components"
import styles from "./index.module.less"

const HeaderComponent = () => {

    return(
        <div>
            <div className={styles.headerContainer}>
                <div className={styles.headerItem}>
                    {styles.headerContainer}
                    Home
                </div>
                <div className="header-item">
                    Deals
                </div>
                <div>
                    Clients
                </div>
                <div className="header-item">
                    Login
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent