import React, {useEffect, useState} from "react";
import "./index.scss";

interface TableHorizontalProps {
  column: {
    title?: string;
    value?: string;
    obligatory?: boolean;
    render?: () => JSX.Element;
    children?: {
      title?: string;
      value?: string;
      obligatory?: boolean;
      render?: () => JSX.Element;
    }[];
    brother?: {
      title?: string;
      value?: string;
      obligatory?: boolean;
      render?: () => JSX.Element;
    }[];
  }[];
}

function TableHorizontal(Props: TableHorizontalProps): JSX.Element {
  const {column} = Props;

  const [colSpanValue, setColSpanValue] = useState(0);

  useEffect(() => {
    let maxlength = 0;
    column.forEach((item, index): void => {
      if (item.brother && item.brother?.length > maxlength)
        maxlength = item.brother?.length;
    });
    setColSpanValue(maxlength);
  }, []);

  return (
    <tbody className="contentTable">
      {column.map((item, index): JSX.Element => {
        if (!item.children)
          return (
            <tr key={index}>
              <td colSpan={2} className="field_title">
                <div className="field_title_content">
                  {item.title}
                  {item.obligatory && <div className="obligatory">*</div>}
                </div>
              </td>
              <td
                colSpan={!item.brother ? colSpanValue + 2 : 0}
                className="field_value"
              >
                <div className="field_value_content">
                  {item.render && item.render()}
                  {!item.render && item.value}
                </div>
              </td>
              {item.brother?.map((brotherItem, i) => {
                return (
                  <div key={i}>
                    <td className="field_title">
                      <div className="field_title_content">
                        {brotherItem.title}
                        {brotherItem.obligatory && (
                          <div className="obligatory">*</div>
                        )}
                      </div>
                    </td>
                    <td className="field_value">
                      <div className="field_value_content">
                        {brotherItem.render && brotherItem.render()}
                        {!brotherItem.render && item.value}
                      </div>
                    </td>
                  </div>
                );
              })}
            </tr>
          );
        return (
          <>
            <tr key={index}>
              <td className="field_title" rowSpan={item.children.length + 1}>
                <div className="field_title_content">
                  {item.title}
                  {item.obligatory && <div className="obligatory">*</div>}
                </div>
              </td>
            </tr>
            {item.children.map((item, index): JSX.Element => {
              return (
                <tr key={index}>
                  <td className="field_title">
                    <div className="field_title_content">{item.title}</div>
                  </td>
                  <td colSpan={colSpanValue + 2} className="field_value">
                    <div className="field_value_content">
                      {item.render ? item.render() : item.value}
                    </div>
                  </td>
                </tr>
              );
            })}
          </>
        );
      })}
    </tbody>
  );
}

export default TableHorizontal;
