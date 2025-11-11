// Function to render the JSON rich text
const renderContent = (content) => {
    if (!content) return null;

    return content?.map((node, index) => {
        switch (node.type) {
        case 'paragraph':
            return (
            <p
                key={index}
                className="text-black font-normal lg:text-[18px] text-[12px] opacity-[70%] font-openSans mt-[10px] mb-4"
            >
                {renderChildren(node.children)}
            </p>
            );

        case 'heading':
            const HeadingTag = `h${node.level}`; // Dynamically set heading level
            let headingStyle = "";

            switch (node.level) {
                case 1:
                    headingStyle =
                        "lg:text-[28px] text-[20px] font-semibold  my-4 mt-8 font-openSans";
                    break;
                case 2:
                    headingStyle =
                        "lg:text-[26px] text-[18px] font-openSans font-bold text-black my-4 mt-8 leading-tight";
                    break;
                case 3:
                    headingStyle =
                        "lg:text-[24px] text-[18px] font-semibold  my-4 mt-8 font-openSans";
                    break;
                case 4:
                    headingStyle =
                        "lg:text-[22px] text-[16px] font-semibold  my-4 mt-8 font-openSans";
                    break;
                case 5:
                    headingStyle =
                        "lg:text-[20px] text-[16px] font-semibold  my-4 mt-8 font-openSans";
                    break;
                case 6:
                    headingStyle =
                        "lg:text-[18px] text-[14px] font-semibold  my-4 mt-8 font-openSans";
                    break;
                default:
                    headingStyle =
                        "lg:text-[16px] text-[16px] font-semibold  my-4 mt-8 font-openSans";
            }

            return (
            <HeadingTag key={index} className={headingStyle}>
                {renderChildren(node.children)}
            </HeadingTag>
            );

        case 'list':
            return node.format === 'unordered' ? (
            <ul key={index} className="list-disc ml-6">
                {renderChildren(node.children)}
            </ul>
            ) : (
            <ol key={index} className="list-decimal ml-6">
                {renderChildren(node.children)}
            </ol>
            );

        case 'list-item':
            return <li key={index}>{renderChildren(node.children)}</li>;

        default:
            return null;
        }
    });
};

// Function to handle child nodes (text, bold, italic, etc.)
const renderChildren = (children) => {
    return children.map((child, index) => {
        if (child.type === 'list-item') {
            return <li key={index}>{renderChildren(child.children)}</li>;
        }

        if (child.type === 'link') {
            return (
                <a
                    key={index}
                    href={child.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary font-medium"
                >
                    {renderChildren(child.children)}
                </a>
            );
        }

        let element = child.text || '';

        if (child.bold) element = <strong key={index}>{element}</strong>;
        if (child.italic) element = <em key={index}>{element}</em>;
        if (child.underline) element = <u key={index}>{element}</u>;
        if (child.strikethrough)
            element = (
                <span key={index} className="line-through">
                {element}
                </span>
            );

        return element;
    });
};

// BlogPost Component
const RichTextRenderer = ({ content }) => {
    return <div>{renderContent(content)}</div>;
};

export default RichTextRenderer;
