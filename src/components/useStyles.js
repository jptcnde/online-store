/**
 * @author: Jopet
 * @file: useStyles

*/
import { useEffect, useMemo, useContext, useRef } from 'react';
import { jss } from 'react-jss';
import ThemeContext from './ThemeContext';


export default function useStyles(stylesOrCreator, inputOptions = {}, data) {
  const themeCtx = useContext(ThemeContext);

  const {
    theme = themeCtx,
    meta = 'Styles-Hook',
    ...options
  } = inputOptions;

  const styles = typeof stylesOrCreator === 'function'
    ? stylesOrCreator(theme)
    : stylesOrCreator;

  const sheetRef = useRef(jss.createStyleSheet(styles, {...options, link: !!data, meta}));

  useEffect(() =>{
    sheetRef.current.attach();
    return () => {
      jss.removeStyleSheet(sheetRef.current);
    };
  }, []);

  const { classes, } = useMemo(() => {
    sheetRef.current.update(data);

    return {
      classes: sheetRef.current.classes
    }
  }, [theme, data]);


  return {
    classes,
  }
}
