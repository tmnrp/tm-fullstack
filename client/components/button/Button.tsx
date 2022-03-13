/* eslint-disable react/display-name */
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";

//
export const Button = ({
  onClick,
  className = "",
  children,
  ...props
}: IButton) => (
  <button
    className={`button p-0 space-x-1 flex items-center tracking-widest ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

//
export interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string;
}

//
Button.Add = (props: IButton) => (
  <Button className="px-1 text-sm info outlined" {...props}>
    <GoogleMaterialIcons className="flex items-center" iconName="add" />
    <div className="hidden sm:flex">{props.label || "New"}</div>
  </Button>
);

//
Button.View = (props: IButton) => (
  <Button className="px-1 text-sm info outlined" {...props}>
    <GoogleMaterialIcons className="flex items-center" iconName="menu_book" />
    <div className="hidden sm:flex">{props.label || "View"}</div>
  </Button>
);

//
Button.Edit = (props: IButton) => (
  <Button className="px-1 text-sm info outlined" {...props}>
    <GoogleMaterialIcons iconName="edit" />
    <div className="hidden sm:flex">{props.label || "Edit"}</div>
  </Button>
);

//
Button.EditIcon = (props: IButton) => (
  <Button className="info outlined" {...props}>
    <GoogleMaterialIcons iconName="edit" />
  </Button>
);

//
Button.Cancel = (props: IButton) => (
  <Button className="px-1 text-sm" {...props}>
    <GoogleMaterialIcons className="flex items-center" iconName="close" />
    <div className="hidden sm:flex">{props.label || "Cancel"}</div>
  </Button>
);
//
Button.ClearIcon = (props: IButton) => (
  <Button {...props}>
    <GoogleMaterialIcons className="warning" iconName="clear_all" />
  </Button>
);

//
Button.Save = (props: IButton) => (
  <Button className="px-1 text-sm info outlined" {...props}>
    <GoogleMaterialIcons className="flex items-center" iconName="save" />
    <div className="hidden sm:flex">{props.label || "Save"}</div>
  </Button>
);

//
Button.Delete = (props: IButton) => (
  <Button className="px-1 text-sm danger outlined" {...props}>
    <GoogleMaterialIcons className="flex items-center" iconName="delete" />
    <div className="hidden sm:flex">{props.label || "Delete"}</div>
  </Button>
);

//
Button.DeleteIcon = (props: IButton) => (
  <Button className="danger outlined" {...props}>
    <GoogleMaterialIcons iconName="delete" />
  </Button>
);

//
Button.Upload = (props: IButton) => (
  <Button className="px-1 text-sm info outlined" {...props}>
    <GoogleMaterialIcons className="flex items-center" iconName="file_upload" />
    <div className="hidden sm:flex">{props.label || "Upload"}</div>
  </Button>
);
