import { Indicator, Menu, Notification } from "@mantine/core"
import { IconBell, IconCheck } from "@tabler/icons-react"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getNotification, readNotification } from "../../Services/notifyService";
import { useNavigate } from "react-router-dom";

const NotifyMenu = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user)
  const [opened, setOpened] = useState(false);
  const [notifications, setNotifications] = useState<any>([])

  useEffect(() => {
    getNotification(user.id).then((res) => { 
      setNotifications(res);
    }).catch((err) => console.log(err))
  }, [user])

  const unread = (index: number) => {
    let notification = [...notifications];
    notification = notification.filter((noti: any, i: number) => i !== index);
    setNotifications(notification);
    readNotification(notifications[index].id).then((res: any) => console.log(res)).catch((err: any) => console.log(err))
  }

  return (
    <Menu opened={opened} onChange={setOpened} shadow="md" width={400}>
      <Menu.Target>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator disabled={notifications.length<=0} color="bright-sun.4" size={8} offset={6} processing>
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>

        {
          notifications.map((noti: any, index: number) => (
            <Notification onClick={()=>{
              navigate(noti.route)
              unread(index)
              setOpened(false);
            }}  key={index} onClose={() => unread(index)} className="hover:bg-mine-shaft-900 cursor-pointer" icon={<IconCheck size={20} style={{ width: 20, height: 20 }} />} color="teal" title={noti.action} mt="md">
              {noti.message}
            </Notification>
          ))
        }
        {
          notifications.length === 0 && <div className="text-center text-mine-shaft-300" >
            No Notifications
          </div>
        }
      </Menu.Dropdown>
    </Menu>
  )
}

export default NotifyMenu
