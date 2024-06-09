import "./AdminPanel.css";
import { useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";

const AdminPanel = () => {

  const {tg} = useTelegram()
  useEffect(() => {
    tg.MainButton.hide()
  }, [tg])

  return (
    <div className="admin">
        ADMIN PANEL
    </div>    
  )
}

export default AdminPanel